import {
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
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

export default function SubstationSelectForm({ form }: { form: any }) {
  const [data2, setData2] = useState<string[]>([]);
  const [loading2, setLoading2] = useState(false);

  const { watch } = form;
  // const user1Value = watch("user1");
  const user1Value = useWatch({ name: "user1" });

  useEffect(() => {
    if (user1Value) {
      setLoading2(true);
      fetch(`http://127.0.0.1:4010/books`)
        .then(
          (res) =>
            new Promise((resolve) => setTimeout(() => resolve(res), 2000))
        ) // Delay the response by 2 seconds
        .then((res) => res.json())
        .then((data) => {
          console.log("data2", data);
          setData2(data);
          setLoading2(false);
        });
    }
  }, [user1Value]);

  return (
    <FormField
      control={form.control}
      name="user2"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading2}>
            <FormControl>
              <SelectTrigger>
                {loading2 ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : (
                  <SelectValue placeholder="Select a verified email to display" />
                )}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data2.map((data, index) => (
                <SelectItem key={index} value={data}>
                  {data}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            You can manage email addresses in your email settings.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
