import { ContactPage } from "~/pages/contact";
import type { Route } from "./+types/contact";

export function meta() {
	return [{ title: "Contact | Portfolio" }];
}

export default function ContactRoute(_: Route.ComponentProps) {
	return <ContactPage />;
}
