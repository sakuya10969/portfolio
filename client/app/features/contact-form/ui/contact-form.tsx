import { Alert, Button, Card, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { usePostApiContact } from "~/shared/api/generated/endpoints/contact/contact";
import { getApiErrorMessage } from "~/shared/lib/api";
import { type ContactFormValues, contactFormSchema } from "../model/schema";

export function ContactForm() {
	const [submitted, setSubmitted] = useState(false);
	const mutation = usePostApiContact();
	const form = useForm<ContactFormValues>({
		initialValues: {
			email: "",
			message: "",
			name: "",
			subject: "",
		},
		validate: (values) => {
			const parsed = contactFormSchema.safeParse(values);

			if (parsed.success) {
				return {};
			}

			return parsed.error.flatten().fieldErrors;
		},
	});

	const onSubmit = form.onSubmit(async (values) => {
		setSubmitted(false);

		try {
			const response = await mutation.mutateAsync({ data: values });

			if (response.status >= 200 && response.status < 300) {
				setSubmitted(true);
				form.reset();
				notifications.show({
					color: "teal",
					message: "Message sent successfully",
					title: "Success",
				});
				return;
			}

			throw new Error("Failed to submit contact form");
		} catch (error) {
			notifications.show({
				color: "red",
				message: getApiErrorMessage(error),
				title: "Error",
			});
		}
	});

	return (
		<Card p="xl" maw={640} mx="auto">
			<form onSubmit={onSubmit}>
				<Stack gap="md">
					{submitted ? (
						<Alert color="teal" icon={<IconCheck size={16} />} title="Success">
							Message sent successfully
						</Alert>
					) : null}

					{mutation.isError ? (
						<Alert
							color="red"
							icon={<IconAlertCircle size={16} />}
							title="Error"
						>
							送信に失敗しました。しばらく後にお試しください。
						</Alert>
					) : null}

					<TextInput
						withAsterisk
						label="お名前"
						placeholder="山田 太郎"
						key={form.key("name")}
						{...form.getInputProps("name")}
					/>
					<TextInput
						withAsterisk
						label="メールアドレス"
						placeholder="example@email.com"
						key={form.key("email")}
						{...form.getInputProps("email")}
					/>
					<TextInput
						withAsterisk
						label="件名"
						placeholder="お問い合わせ件名"
						key={form.key("subject")}
						{...form.getInputProps("subject")}
					/>
					<Textarea
						withAsterisk
						label="メッセージ"
						placeholder="お問い合わせ内容をご記入ください"
						minRows={6}
						key={form.key("message")}
						{...form.getInputProps("message")}
					/>
					<Button
						type="submit"
						fullWidth
						size="lg"
						loading={mutation.isPending}
					>
						送信する
					</Button>
				</Stack>
			</form>
		</Card>
	);
}
