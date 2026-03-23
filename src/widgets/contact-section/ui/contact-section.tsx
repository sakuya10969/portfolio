import { ContactForm } from '@/features/contact-form';

export function ContactSection() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        ご質問・ご相談・お仕事のご依頼など、お気軽にご連絡ください。
        内容を確認次第、折り返しご連絡いたします。
      </p>
      <ContactForm />
    </div>
  );
}
