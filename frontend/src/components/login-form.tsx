import { LucideMessageCircle, LucidePhoneCall } from "lucide-react";
import { Button } from "../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { cn } from "../lib/utils";

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const currentYear = new Date().getFullYear();
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					<CardDescription>
						Login with your Apple or Google account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid gap-6">
							<div className="grid gap-6">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										required
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
										{/* <a
											href="#"
											className="ml-auto text-sm underline-offset-4 hover:underline"
										>
											Forgot your password?
										</a> */}
									</div>
									<Input id="password" type="password" required />
								</div>
								<Button type="submit" className="w-full">
									Login
								</Button>
							</div>
							<div className="text-center text-sm">
								Contact support if you have any login issues
								<div className="flex items-center justify-center pt-1">
									<Button
										variant="ghost"
										size="icon"
										onClick={() =>
											window.open("https://wa.me/+8801955206804", "_blank")
										}
									>
										<LucideMessageCircle />
									</Button>

									<Button
										variant="ghost"
										size="icon"
										onClick={() => (window.location.href = "tel:+1234567890")}
									>
										<LucidePhoneCall />
									</Button>
								</div>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
				Microfinance management system. &copy; {currentYear} All rights
				reserved. <br />
				Developed by <a href="https://farid-alam.com/">Farid Alam</a>
			</div>
		</div>
	);
}
