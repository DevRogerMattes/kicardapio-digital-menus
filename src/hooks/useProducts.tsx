import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthRestaurant } from "./useAuthRestaurant";
import { toast } from "sonner";

export function useProducts() {
  const restaurantId = useAuthRestaurant();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingImg, setUploadingImg] = useState(false);

  useEffect(() => {
    if (!restaurantId) return;
    setIsLoading(true);
    supabase
      .from("products")
      .select(`
        *,
        categories (
          name, image_url
        )
      `)
      .eq("restaurant_id", restaurantId)
      .then(async ({ data, error }) => {
        if (error) return toast.error("Erro ao buscar produtos");
        // Formatar para a tabela
        setProducts(
          (data || []).map((p: any) => ({
            ...p,
            category_name: p.categories?.name || "",
            category_image_url: p.categories?.image_url || "",
          }))
        );
        setIsLoading(false);
      });
  }, [restaurantId]);

  const reload = () => {
    if (!restaurantId) return;
    setIsLoading(true);
    supabase
      .from("products")
      .select(`
        *,
        categories (
          name, image_url
        )
      `)
      .eq("restaurant_id", restaurantId)
      .then(({ data, error }) => {
        if (!error && data) setProducts(
          data.map((p: any) => ({
            ...p,
            category_name: p.categories?.name || "",
            category_image_url: p.categories?.image_url || "",
          }))
        );
        setIsLoading(false);
      });
  }

  async function upsertProduct(prod: any) {
    let image_url = prod.image_url;
    if (prod.image && prod.image[0]) {
      setUploadingImg(true);
      const file = prod.image[0];
      let idToUse = prod.id || crypto.randomUUID();
      const path = `products/${restaurantId}/${idToUse}.jpg`;
      const { error: uploadErr } = await supabase.storage
        .from("products")
        .upload(path, file, { upsert: true });
      if (uploadErr) {
        toast.error("Falha ao subir imagem");
        setUploadingImg(false);
        return false;
      }
      image_url = supabase.storage.from("products").getPublicUrl(path).data.publicUrl;
      setUploadingImg(false);
    }
    const newProd = {
      name: prod.name,
      description: prod.description,
      price: Number(prod.price),
      image_url,
      category_id: prod.category_id,
      has_optionals: prod.has_optionals,
      observations: prod.observations,
      active: prod.active,
      restaurant_id: restaurantId,
    };

    let result;
    if (prod.id) {
      result = await supabase
        .from("products")
        .update(newProd)
        .eq("id", prod.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from("products")
        .insert([newProd])
        .select()
        .single();
    }
    if (result.error) {
      toast.error("Erro ao salvar produto");
      return false;
    }
    reload();
    toast.success("Produto salvo com sucesso!");
    return true;
  }

  async function removeProduct(id: string) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts(products.filter((p: any) => p.id !== id));
      toast.success("Produto removido");
    }
  }

  return { products, isLoading, uploadingImg, upsertProduct, removeProduct, reload };
}
