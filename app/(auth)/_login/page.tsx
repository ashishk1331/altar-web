"use client";

import { useFormik } from "formik";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import BannerBox from "@/components/ui/BannerBox";
import Button from "@/components/ui/Button";
import { H3, P } from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import { XStack, YStack } from "@/components/ui/Stack";
import { zodValidate } from "@/utils/formHelper";

const schema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				email: "",
				password: "",
			},
			validate(values) {
				return zodValidate(values, schema);
			},
			onSubmit: (values) => {
				console.log(values);
			},
		});

	return (
		<YStack className="mt-24">
			<H3>Login</H3>
			<form onSubmit={handleSubmit}>
				<YStack className="gap-4 mt-8">
					<BannerBox>hello</BannerBox>

					<Input
						type="text"
						name="email"
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Email"
					/>
					{touched.email && errors.email && (
						<XStack className="w-full text-left items-center gap-1">
							<AlertCircle size={16} className="text-white fill-red-500" />
							<P className="text-red-500">{errors.email}</P>
						</XStack>
					)}

					<Input
						type="password"
						name="password"
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Password"
					/>
					{touched.password && errors.password && (
						<XStack className="w-full text-left items-center gap-1">
							<AlertCircle size={16} className="text-white fill-red-500" />
							<P className="text-red-500">{errors.password}</P>
						</XStack>
					)}

					<Button type="submit" className="mt-4">
						Submit
					</Button>
				</YStack>
			</form>

			<P className="mt-8">
				Not registered yet?{" "}
				<Link href="/signup" className="text-indigo-500 underline">
					Sign Up
				</Link>
			</P>
		</YStack>
	);
}
