
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCategories } from "@/hooks/useCategories";
import { useOptionals } from "@/hooks/useOptionals";
import { useProducts } from "@/hooks/useProducts";
import ProductObservations from "./ProductObservations";
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Minus, Plus } from "lucide-react"

interface ProductFormProps {
  product?: any;
  onComplete: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onComplete }) => {
  const { upsertProduct, uploadingImg } = useProducts();
  const { categories } = useCategories();
  const { optionalGroups } = useOptionals();
  const [defaultObservations, setDefaultObservations] = useState<string[]>([]);

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
      default_observations: [],
    },
    values: product ? {
      ...product,
      price: product.price ? String(product.price) : "",
      category_id: product.category_id,
      has_optionals: !!product.has_optionals,
      optionals_ids: product.optionals_ids || [],
      observations: product.observations || "",
      active: product.active ?? true,
      default_observations: product.default_observations || [],
    } : undefined
  });

  useEffect(() => {
    if (product?.default_observations) {
      setDefaultObservations(product.default_observations);
    }
  }, [product]);

  const hasOptionals = watch("has_optionals");
  const observations = watch("observations");

  const [selectedOptionals, setSelectedOptionals] = useState<{[key: string]: number}>(
    product?.optionals_ids?.reduce((acc: any, id: string) => ({ ...acc, [id]: 1 }), {}) || {}
  );

  const handleOptionalToggle = (optionalId: string, checked: boolean) => {
    setSelectedOptionals(prev => {
      const newState = { ...prev };
      if (checked) {
        newState[optionalId] = 1;
      } else {
        delete newState[optionalId];
      }
      setValue("optionals_ids", Object.keys(newState));
      return newState;
    });
  };

  const handleQuantityChange = (optionalId: string, increment: boolean) => {
    setSelectedOptionals(prev => {
      const currentQty = prev[optionalId] || 0;
      const optional = optionalGroups.find((o: any) => o.id === optionalId);
      if (!optional) return prev;

      let newQty = increment ? currentQty + 1 : currentQty - 1;
      newQty = Math.max(optional.min_selection, Math.min(newQty, optional.max_selection));

      return {
        ...prev,
        [optionalId]: newQty
      };
    });
  };

  // Add these missing handler functions
  const handleAddObservation = (observation: string) => {
    setDefaultObservations(prev => [...prev, observation]);
    setValue("default_observations", [...defaultObservations, observation]);
  };

  const handleRemoveObservation = (index: number) => {
    const newObservations = [...defaultObservations];
    newObservations.splice(index, 1);
    setDefaultObservations(newObservations);
    setValue("default_observations", newObservations);
  };

  const onSubmit = async (data: any) => {
    const formData = {
      ...data,
      optionals_quantities: selectedOptionals,
      id: product?.id
    };
    
    const ok = await upsertProduct(formData);
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
          <Input 
            type="number" 
            step="0.01" 
            min="0"
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
        <div className="space-y-4 border rounded-lg p-4">
          <Label>Itens Opcionais</Label>
          <div className="space-y-2">
            {optionalGroups.map((optional: any) => (
              <div key={optional.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={!!selectedOptionals[optional.id]}
                    onCheckedChange={(checked) => handleOptionalToggle(optional.id, checked as boolean)}
                  />
                  <div>
                    <p className="font-medium">{optional.name}</p>
                    <p className="text-sm text-gray-500">
                      R$ {Number(optional.price).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                    </p>
                  </div>
                </div>
                
                {selectedOptionals[optional.id] && (
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(optional.id, false)}
                      disabled={selectedOptionals[optional.id] <= optional.min_selection}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="min-w-[2rem] text-center">
                      {selectedOptionals[optional.id]}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(optional.id, true)}
                      disabled={selectedOptionals[optional.id] >= optional.max_selection}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <ProductObservations
        defaultObservations={defaultObservations}
        onAddObservation={handleAddObservation}
        onRemoveObservation={handleRemoveObservation}
        customObservation={observations}
        onCustomObservationChange={(value) => setValue("observations", value)}
      />
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
  );
};

export default ProductForm;
