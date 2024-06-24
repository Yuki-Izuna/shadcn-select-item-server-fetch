import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function FeederSelectForm({form}: {form: any}) {

  const [data1, setData1] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:4010/users")
      .then((res) => res.json())
      .then((data) => {
        setData1(data);
      });
  }, []);

  return (
    <FormField
    control={form.control}
    name="user1"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {data1.map((data, index) => (
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
