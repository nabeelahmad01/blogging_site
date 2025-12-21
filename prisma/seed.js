const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create categories
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { slug: 'technology' },
            update: {},
            create: { name: 'Technology', slug: 'technology' },
        }),
        prisma.category.upsert({
            where: { slug: 'lifestyle' },
            update: {},
            create: { name: 'Lifestyle', slug: 'lifestyle' },
        }),
        prisma.category.upsert({
            where: { slug: 'business' },
            update: {},
            create: { name: 'Business', slug: 'business' },
        }),
        prisma.category.upsert({
            where: { slug: 'health' },
            update: {},
            create: { name: 'Health', slug: 'health' },
        }),
        prisma.category.upsert({
            where: { slug: 'travel' },
            update: {},
            create: { name: 'Travel', slug: 'travel' },
        }),
    ]);

    console.log(`✅ Created ${categories.length} categories`);

    // Create sample blog posts
    const samplePosts = [
        {
            title: '10 Essential Tips for Productive Remote Work',
            slug: 'essential-tips-productive-remote-work',
            excerpt: 'Discover proven strategies to maximize your productivity while working from home. From setting up the perfect workspace to maintaining work-life balance.',
            content: `
        <h2>Introduction</h2>
        <p>Remote work has become the new normal for millions of professionals worldwide. Whether you're a seasoned remote worker or just starting your work-from-home journey, these tips will help you stay productive and maintain a healthy work-life balance.</p>
        
        <h2>1. Create a Dedicated Workspace</h2>
        <p>Having a specific area for work helps your brain switch into "work mode." It doesn't have to be a separate room – even a corner of your living room can work if it's consistently used for work only.</p>
        
        <h2>2. Stick to a Routine</h2>
        <p>Wake up at the same time every day, get dressed (yes, change out of those pajamas!), and start work at a consistent time. This helps maintain structure and discipline.</p>
        
        <h2>3. Take Regular Breaks</h2>
        <p>Use the Pomodoro Technique: work for 25 minutes, then take a 5-minute break. After four cycles, take a longer 15-30 minute break. This keeps your mind fresh and prevents burnout.</p>
        
        <h2>4. Communicate Effectively</h2>
        <p>Over-communicate with your team. Use video calls when possible, keep your status updated, and don't hesitate to ask questions or share updates.</p>
        
        <h2>5. Set Boundaries</h2>
        <p>When your work day ends, step away from your workspace. Turn off notifications and resist the urge to check emails after hours.</p>
        
        <h2>Conclusion</h2>
        <p>Remote work offers incredible flexibility, but it requires discipline and the right habits. By implementing these tips, you'll find yourself more productive, less stressed, and better able to enjoy the benefits of working from home.</p>
      `,
            categorySlug: 'business',
            tags: 'remote work, productivity, work from home, tips',
            published: true,
        },
        {
            title: 'The Ultimate Guide to Starting a Blog in 2024',
            slug: 'ultimate-guide-starting-blog-2024',
            excerpt: 'Learn everything you need to know about starting a successful blog. From choosing your niche to monetization strategies.',
            content: `
        <h2>Why Start a Blog?</h2>
        <p>Blogging remains one of the most powerful ways to share your knowledge, build an audience, and even generate income. In 2024, the opportunities are greater than ever.</p>
        
        <h2>Step 1: Choose Your Niche</h2>
        <p>The most successful blogs focus on a specific topic. Consider your passions, expertise, and what topics you could write about consistently for years.</p>
        
        <h2>Step 2: Select Your Platform</h2>
        <p>WordPress, Wix, Squarespace, or even custom solutions – each has its pros and cons. For most beginners, WordPress offers the best balance of flexibility and ease of use.</p>
        
        <h2>Step 3: Create Quality Content</h2>
        <p>Content is king. Focus on creating valuable, well-researched articles that solve problems for your readers. Aim for at least 1,500 words per post for better SEO.</p>
        
        <h2>Step 4: Promote Your Content</h2>
        <p>Use social media, email marketing, and SEO to drive traffic to your blog. Consistency is key – post regularly and engage with your audience.</p>
        
        <h2>Step 5: Monetize</h2>
        <p>Once you have traffic, explore monetization options: Google AdSense, affiliate marketing, sponsored posts, digital products, or online courses.</p>
        
        <h2>Final Thoughts</h2>
        <p>Starting a blog takes time and effort, but the rewards can be significant. Start today, stay consistent, and watch your blog grow!</p>
      `,
            categorySlug: 'technology',
            tags: 'blogging, beginners, tutorial, 2024',
            published: true,
        },
        {
            title: '5 Morning Habits That Will Transform Your Day',
            slug: 'morning-habits-transform-your-day',
            excerpt: 'Start your day right with these powerful morning habits used by successful people around the world.',
            content: `
        <h2>The Power of Morning Routines</h2>
        <p>How you start your morning often sets the tone for your entire day. Successful people understand this and have crafted morning routines that maximize their energy and focus.</p>
        
        <h2>1. Wake Up Early</h2>
        <p>Early risers often accomplish more before 9 AM than most people do all day. Start with just 30 minutes earlier than usual and gradually adjust.</p>
        
        <h2>2. Hydrate First Thing</h2>
        <p>After 7-8 hours of sleep, your body is dehydrated. Drink a full glass of water before anything else to kickstart your metabolism and brain function.</p>
        
        <h2>3. Move Your Body</h2>
        <p>Whether it's yoga, a quick workout, or just stretching, physical movement increases blood flow and releases endorphins that boost your mood.</p>
        
        <h2>4. Practice Mindfulness</h2>
        <p>Even 5 minutes of meditation or journaling can reduce stress and increase focus. Apps like Headspace or Calm make it easy to get started.</p>
        
        <h2>5. Eat a Healthy Breakfast</h2>
        <p>Fuel your body with protein and complex carbohydrates. Skip the sugary cereals and opt for eggs, oatmeal, or a smoothie with greens.</p>
        
        <h2>Conclusion</h2>
        <p>Implementing these habits won't happen overnight, but starting with just one and building from there can lead to remarkable improvements in your daily productivity and well-being.</p>
      `,
            categorySlug: 'lifestyle',
            tags: 'morning routine, habits, productivity, wellness',
            published: true,
        },
    ];

    for (const post of samplePosts) {
        const category = categories.find(c => c.slug === post.categorySlug);
        if (category) {
            await prisma.post.upsert({
                where: { slug: post.slug },
                update: {},
                create: {
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    content: post.content,
                    categoryId: category.id,
                    tags: post.tags,
                    published: post.published,
                    views: Math.floor(Math.random() * 500) + 50,
                },
            });
        }
    }

    console.log(`✅ Created ${samplePosts.length} sample blog posts`);
    console.log('🎉 Database seeding completed!');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
