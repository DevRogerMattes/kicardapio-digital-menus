
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthRestaurant } from "./useAuthRestaurant";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category_id?: string;
  has_optionals?: boolean;
  optionals_ids?: string[];
  optionals_quantities?: number[];
  observations?: boolean;
  default_observations?: string[];
  active?: boolean;
  restaurant_id: string;
  categories?: {
    name: string;
    image_url?: string;
  };
  category_name?: string;
  category_image_url?: string;
}

export function useProducts() {
  const restaurantId = useAuthRestaurant();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingImg, setUploadingImg] = useState(false);

  useEffect(() => {
    if (!restaurantId) return;
    loadProducts();
  }, [restaurantId]);

  // Changed to take no parameters to match how it's called in the useEffect
  const loadProducts = () => {
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
        if (error) return toast.error("Erro ao buscar produtos");
        // Format for table
        setProducts(
          (data || []).map((p: Product) => ({
            ...p,
            category_name: p.categories?.name || "",
            category_image_url: p.categories?.image_url || "",
          }))
        );
        setIsLoading(false);
      });
  };

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
      optionals_ids: prod.optionals_ids,
      optionals_quantities: prod.optionals_quantities,
      observations: prod.observations,
      default_observations: prod.default_observations || [],
      active: prod.active,
      restaurant_id: restaurantId,
    };

    try {
      let result;
      if (prod.id) {
        const { data, error } = await supabase
          .from("products")
          .update(newProd)
          .eq("id", prod.id);
          
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabase
          .from("products")
          .insert([newProd]);
          
        if (error) throw error;
        result = data;
      }
      
      loadProducts();
      toast.success("Produto salvo com sucesso!");
      return true;
    } catch (error) {
      toast.error("Erro ao salvar produto");
      return false;
    }
  }

  async function removeProduct(id: string) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts(products.filter((p: Product) => p.id !== id));
      toast.success("Produto removido");
    } else {
      toast.error("Erro ao remover produto");
    }
  }

  return { 
    products, 
    isLoading, 
    uploadingImg, 
    upsertProduct, 
    removeProduct, 
    reload: loadProducts 
  };
}
