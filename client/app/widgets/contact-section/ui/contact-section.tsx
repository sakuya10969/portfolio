import { Stack, Text } from "@mantine/core";
import { ContactForm } from "~/features/contact-form";

export function ContactSection() {
	return (
		<Stack gap="xl">
			<Text c="dimmed" maw={640}>
				ご質問・ご相談・お仕事のご依頼など、お気軽にご連絡ください。内容を確認次第、
				折り返しご連絡いたします。
			</Text>
			<ContactForm />
		</Stack>
	);
}
