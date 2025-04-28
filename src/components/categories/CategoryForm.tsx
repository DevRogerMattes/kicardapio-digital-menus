
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/hooks/useCategories";
import { Label } from "@/components/ui/label";
import { Image } from "lucide-react";

interface CategoryFormProps {
  category?: any;
  onComplete: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onComplete }) => {
  const { upsertCategory, uploadingImg } = useCategories();
  const form = useForm({
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      image: undefined,
      image_url: category?.image_url || "",
      display_order: category?.display_order || 0,
      active: category?.active ?? true,
    },
  });

  const onSubmit = async (data: any) => {
    const success = await upsertCategory({
      ...data,
      id: category?.id,
    });
    if (success) {
      onComplete();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Categoria</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Pizzas, Bebidas..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Descrição da categoria..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Imagem da Categoria</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  {(form.watch("image_url") || value) && (
                    <div className="w-20 h-20 rounded-lg border overflow-hidden">
                      <img
                        src={
                          value
                            ? URL.createObjectURL(value[0])
                            : form.watch("image_url")
                        }
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <Label
                      htmlFor="image"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Image className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="text-sm text-gray-500">
                          Clique para fazer upload
                        </p>
                      </div>
                      <Input
                        id="image"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files?.length) {
                            onChange(files);
                          }
                        }}
                        {...field}
                      />
                    </Label>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onComplete()}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={uploadingImg}>
            {uploadingImg ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
