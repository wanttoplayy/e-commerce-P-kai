"use client";

import * as z from "zod";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const formSchema = z.object({
  name: z.string().min(1, {
    message: "ชื่อร้านต้องอย่างน้อย 1 ตัวอักษร",
  }),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSumbit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    //ไว้สร้างร้าน
  };

  return (
    <Modal
      title="สร้างร้านใหม่"
      description="ใส่ชื่อร้านเพื่อจัดการสินค้าและหมวดหมู่สินค้า"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSumbit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ใส่ชื่อร้าน</FormLabel>
                    <FormControl>
                      <Input placeholder="ชื่อร้าน" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" onClick={storeModal.onClose}>
                  ยกเลิก
                </Button>
                <Button type="submit">ไปหน้าถัดไป</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
