
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthRestaurant } from "./useAuthRestaurant";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  display_order: number;
  active: boolean;
}

export function useCategories() {
  const restaurantId = useAuthRestaurant();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingImg, setUploadingImg] = useState(false);

  useEffect(() => {
    if (!restaurantId) return;
    loadCategories();
  }, [restaurantId]);

  // Fixed: No parameters in the function definition
  const loadCategories = () => {
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

    try {
      let result;
      if (cat.id) {
        const { data, error } = await supabase
          .from("categories")
          .update(newCat)
          .eq("id", cat.id);
          
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabase
          .from("categories")
          .insert([newCat]);
          
        if (error) throw error;
        result = data;
      }
      
      loadCategories();
      toast.success("Categoria salva com sucesso!");
      return true;
    } catch (error) {
      toast.error("Erro ao salvar categoria");
      return false;
    }
  }

  async function removeCategory(id: string) {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (!error) {
      setCategories(categories.filter((c: any) => c.id !== id));
      toast.success("Categoria removida");
    } else {
      toast.error("Erro ao remover categoria");
    }
  }

  return { categories, isLoading, uploadingImg, upsertCategory, removeCategory };
}
