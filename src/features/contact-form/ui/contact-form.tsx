"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";
import { contactFormSchema, type ContactFormValues } from "../model/schema";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12 space-y-3">
        <div className="text-4xl">✓</div>
        <p className="text-lg font-medium">送信が完了しました</p>
        <p className="text-sm text-muted-foreground">お問い合わせありがとうございます。内容を確認後、ご連絡いたします。</p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          新しいメッセージを送る
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">お名前 *</Label>
          <Input id="name" {...register("name")} placeholder="山田 太郎" />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス *</Label>
          <Input id="email" type="email" {...register("email")} placeholder="example@email.com" />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">件名 *</Label>
        <Input id="subject" {...register("subject")} placeholder="お問い合わせ件名" />
        {errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">メッセージ *</Label>
        <Textarea id="message" {...register("message")} placeholder="お問い合わせ内容をご記入ください" rows={6} />
        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
      </div>
      {status === "error" && (
        <p className="text-sm text-destructive">送信に失敗しました。しばらく後にお試しください。</p>
      )}
      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "送信中..." : "送信する"}
      </Button>
    </form>
  );
}
