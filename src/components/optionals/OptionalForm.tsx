
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useOptionals } from "@/hooks/useOptionals";

interface OptionalFormProps {
  onSuccess?: () => void;
  defaultValues?: {
    name: string;
    description?: string;
    price: number;
    min_selection: number;
    max_selection: number;
  };
}

export function OptionalForm({ onSuccess, defaultValues }: OptionalFormProps) {
  const form = useForm({
    defaultValues: defaultValues || {
      name: "",
      description: "",
      price: 0,
      min_selection: 0,
      max_selection: 1,
    },
  });

  const { createOptionalItem } = useOptionals();

  const onSubmit = async (values: any) => {
    const success = await createOptionalItem(values);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Item Opcional</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: Queijo extra, Ovo adicional..." />
              </FormControl>
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
                <Textarea {...field} placeholder="Descreva este item opcional..." />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço Adicional (R$)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01" 
                  min="0" 
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="min_selection"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mínimo</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="max_selection"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Máximo</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
