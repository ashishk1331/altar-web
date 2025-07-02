import { Bolt, Book, BookDashed, Bookmark, UserRoundPen } from "lucide-react";

export const navItems = [
	{
		Icon: UserRoundPen,
		label: "Edit Profile",
		href: "/edit-profile",
	},
	{
		Icon: Book,
		label: "Posts",
		href: "/posts",
	},
	{
		Icon: BookDashed,
		label: "Drafts",
		href: "/drafts",
	},
	{
		Icon: Bookmark,
		label: "Bookmarks",
		href: "/bookmarks",
	},
	{
		Icon: Bolt,
		label: "Settings",
		href: "/me",
	},
];
