
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
    minSelection: number;
    maxSelection: number;
  };
}

export function OptionalForm({ onSuccess, defaultValues }: OptionalFormProps) {
  const form = useForm({
    defaultValues: defaultValues || {
      name: "",
      description: "",
      minSelection: 0,
      maxSelection: 1,
    },
  });

  const { createOptionalGroup } = useOptionals();

  const onSubmit = async (values: any) => {
    const success = await createOptionalGroup(values);
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
              <FormLabel>Nome do Grupo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: Sabores, Acompanhamentos..." />
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
                <Textarea {...field} placeholder="Descreva este grupo de opcionais..." />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="minSelection"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mínimo de seleções</FormLabel>
                <FormControl>
                  <Input type="number" min={0} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxSelection"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Máximo de seleções</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
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
