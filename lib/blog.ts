// Blog posts. Today they are written in this project. Later this file can fetch posts from
// WordPress (headless) at build time instead; pages only use these functions, so URLs stay the same.
export type Post = { slug: string; title: string; tag: string; excerpt: string; cover: string; lang: "bn" | "en" };

const POSTS: Post[] = [
  { slug: "blog-komor-byatha-kon-doctor", title: "কোমর ব্যথা হলে কোন ডাক্তার দেখাবেন: নিউরোলজিস্ট না নিউরোসার্জন?", tag: "Spine · বাংলা",
    excerpt: "কখন নিউরোসার্জন দরকার, আর কখন দরকার নেই, সহজ ভাষায়।", cover: "blog-komor-byatha-cover.jpg", lang: "bn" },
];

export async function getPosts(): Promise<Post[]> { return POSTS; }
export async function getPost(slug: string): Promise<Post | undefined> { return POSTS.find((p) => p.slug === slug); }
