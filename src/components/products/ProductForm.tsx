
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCategories } from "@/hooks/useCategories";
import { useOptionals } from "@/hooks/useOptionals";
import { useProducts } from "@/hooks/useProducts";

interface ProductFormProps {
  product?: any;
  onComplete: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onComplete }) => {
  const { upsertProduct, uploadingImg } = useProducts();
  const { categories } = useCategories();
  const { optionals } = useOptionals();

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: undefined,
      category_id: "",
      has_optionals: false,
      optionals_ids: [],
      observations: "",
      active: true,
    },
    values: product ? {
      ...product,
      price: product.price ? String(product.price) : "",
      category_id: product.category_id,
      has_optionals: !!product.has_optionals,
      optionals_ids: product.optionals_ids || [],
      observations: product.observations || "",
      active: product.active ?? true,
    } : undefined
  });

  useEffect(() => {
    if (product) {
      reset({
        ...product,
        price: String(product.price),
        category_id: product.category_id,
        has_optionals: !!product.has_optionals,
        optionals_ids: product.optionals_ids || [],
        observations: product.observations || "",
        active: product.active ?? true,
      });
    }
  }, [product, reset]);

  const hasOptionals = watch("has_optionals");

  const onSubmit = async (data: any) => {
    const ok = await upsertProduct({ ...data, id: product?.id });
    if (ok) {
      onComplete();
      reset();
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Nome *</Label>
        <Input {...register("name", { required: true })} placeholder="Pizza Margherita" />
        {errors.name && <span className="text-red-600 text-xs">Nome obrigatório</span>}
      </div>
      <div>
        <Label>Descrição</Label>
        <Input {...register("description")} placeholder="Descrição opcional" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Preço *</Label>
          <Input type="number" step="0.01" min="0"
            {...register("price", { required: true, valueAsNumber: true })}
            placeholder="0.00"
          />
          {errors.price && <span className="text-red-600 text-xs">Informe um preço</span>}
        </div>
        <div>
          <Label>Categoria *</Label>
          <select {...register("category_id", { required: true })} className="w-full border h-10 rounded px-2">
            <option value="">Selecione...</option>
            {categories.map((cat:any) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.category_id && <span className="text-red-600 text-xs">Selecione a categoria</span>}
        </div>
      </div>
      <div>
        <Label>Foto do produto</Label>
        <Input type="file" accept="image/*" {...register("image")} />
        {uploadingImg && <span className="text-xs text-gray-400">Enviando imagem...</span>}
        {product?.image_url && (
          <img src={product.image_url} alt="" className="mt-2 w-20 h-20 object-cover rounded" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("has_optionals")} id="has_optionals" />
        <Label htmlFor="has_optionals">Este produto possui opcionais?</Label>
      </div>
      {hasOptionals && (
        <div>
          <Label>Grupos de Opcionais</Label>
          <select
            multiple
            {...register("optionals_ids")}
            className="w-full border h-24 rounded px-2"
          >
            {optionals.map((og:any) => (
              <option key={og.id} value={og.id}>{og.name}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <Label>Observações padrão</Label>
        <Input {...register("observations")} placeholder="Exemplo: Sem cebola, Bem passado..." />
      </div>
      <div className="flex items-center gap-3">
        <input type="checkbox" {...register("active")} id="active" />
        <Label htmlFor="active">Ativo</Label>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" type="button" onClick={onComplete}>Cancelar</Button>
        <Button type="submit" disabled={uploadingImg}>
          {product ? "Salvar Alterações" : "Cadastrar Produto"}
        </Button>
      </div>
    </form>
  )
};

export default ProductForm;
