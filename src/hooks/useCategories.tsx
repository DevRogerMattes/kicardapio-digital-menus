
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthRestaurant } from "./useAuthRestaurant";
import { toast } from "sonner";

export function useCategories() {
  const restaurantId = useAuthRestaurant();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingImg, setUploadingImg] = useState(false);

  useEffect(() => {
    if (!restaurantId) return;
    setIsLoading(true);
    supabase
      .from("categories")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .then(({ data, error }) => {
        if (error) return toast.error("Erro ao buscar categorias");
        setCategories(data || []);
        setIsLoading(false);
      });
  }, [restaurantId]);

  const reload = () => {
    if (!restaurantId) return;
    setIsLoading(true);
    supabase
      .from("categories")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .then(({ data, error }) => {
        if (!error && data) setCategories(data);
        setIsLoading(false);
      });
  };

  async function upsertCategory(cat: any) {
    let image_url = cat.image_url;
    if (cat.image && cat.image[0]) {
      setUploadingImg(true);
      const file = cat.image[0];
      let idToUse = cat.id || crypto.randomUUID();
      const path = `categories/${restaurantId}/${idToUse}.jpg`;
      const { error: uploadErr } = await supabase.storage
        .from("categories")
        .upload(path, file, { upsert: true });
      if (uploadErr) {
        toast.error("Falha ao subir imagem");
        setUploadingImg(false);
        return false;
      }
      image_url = supabase.storage.from("categories").getPublicUrl(path).data.publicUrl;
      setUploadingImg(false);
    }
    
    const newCat = {
      name: cat.name,
      description: cat.description,
      image_url,
      display_order: cat.display_order || 0,
      active: cat.active,
      restaurant_id: restaurantId,
    };

    let result;
    if (cat.id) {
      result = await supabase
        .from("categories")
        .update(newCat)
        .eq("id", cat.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from("categories")
        .insert([newCat])
        .select()
        .single();
    }
    if (result.error) {
      toast.error("Erro ao salvar categoria");
      return false;
    }
    reload();
    toast.success("Categoria salva com sucesso!");
    return true;
  }

  async function removeCategory(id: string) {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (!error) {
      setCategories(categories.filter((c: any) => c.id !== id));
      toast.success("Categoria removida");
    }
  }

  return { categories, isLoading, uploadingImg, upsertCategory, removeCategory };
}
