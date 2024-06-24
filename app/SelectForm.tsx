import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import FeederSelectForm from "./components/FeederSelectForm";
import SubstationSelectForm from "./components/SubstationSelectForm";

const FormSchema = z.object({
  user1: z.string({
    required_error: "Please select an email to display.",
  }),
  user2: z.string({
    required_error: "Please select an email to display.",
  }),
});

export function SelectForm() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("submit!", data)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FeederSelectForm form={form}/>
        <SubstationSelectForm form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}