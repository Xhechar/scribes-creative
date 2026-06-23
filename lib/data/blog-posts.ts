export interface BlogPostSeed {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML
  coverImageSeed: string; // picsum seed for placeholder
  tags: string[];
  categorySlug?: string;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
}

export const blogPosts: BlogPostSeed[] = [
  {
    id: "post-rebrand-signs",
    title: "5 Signs Your Nairobi Business Needs a Rebrand",
    slug: "5-signs-your-nairobi-business-needs-a-rebrand",
    excerpt:
      "A dated logo or inconsistent brand identity can quietly cost you customers. Here are five honest signs it's time to invest in a rebrand — and what to do about it.",
    coverImageSeed: "scribes-blog-rebrand",
    tags: ["Branding", "Business Tips"],
    categorySlug: "branding-design",
    seoTitle:
      "5 Signs Your Nairobi Business Needs a Rebrand | Scribes Creative Solutions",
    seoDescription:
      "Is your business brand holding you back? Learn the 5 clear signs it's time to rebrand your Nairobi business, from Scribes Creative Solutions.",
    publishedAt: "2026-05-10",
    content: `
      <p>Most business owners don't decide to rebrand because they woke up one morning and felt like a change. They rebrand because something stopped working — customers are choosing competitors, referrals have slowed, or they keep having to apologise for how their materials look before handing them over.</p>

      <p>Here are five signs that your brand identity is working against you, not for you.</p>

      <h2>1. You're embarrassed to hand out your business card</h2>
      <p>This one is more common than people admit. If you find yourself hesitating before giving someone your card — or worse, not carrying them at all — that's a signal your materials are not representing the quality of what you actually do. Your business card is often the first physical touchpoint a potential client has with you. A flimsy card with a pixelated logo says something about your business before you've said a word.</p>

      <h2>2. Your logo looks like it was made in a hurry</h2>
      <p>Not every business launches with a proper logo. Many start with something put together quickly just to get going — and that's fine. The problem is staying with that logo for years after the business has grown and the quality of your work has improved. If your logo doesn't reflect where your business is <em>now</em>, it's costing you credibility with every customer who sees it.</p>

      <h2>3. Your brand doesn't look consistent anywhere</h2>
      <p>Your signage uses one version of your logo. Your WhatsApp profile picture uses another. Your flyers have a completely different colour scheme. This inconsistency tells potential customers that your business isn't organised — which makes them question whether your actual service or product will be consistent either. A strong brand uses the same colours, fonts, and visual style everywhere, from your shopfront to your business cards to your social media.</p>

      <h2>4. You've outgrown what your brand promises</h2>
      <p>Sometimes the brand you started with was right for the early days but no longer fits the business you've become. If you've moved upmarket, expanded your services, or shifted your target customer, your brand should reflect that shift. A brand built for budget-conscious first-time buyers will quietly push away the premium clients you're now trying to attract.</p>

      <h2>5. Your competitors look more professional than you</h2>
      <p>You don't need to copy what competitors are doing — but you do need to look like you belong in the same conversation. Do a quick check: if a potential customer compared your marketing materials side by side with your top competitors, who would they trust more? If the honest answer isn't you, that's worth acting on.</p>

      <h2>What to do next</h2>
      <p>A rebrand doesn't always mean starting from scratch. Sometimes it's a logo refinement, a consistent colour system, and a set of properly designed templates for your materials. Other times the whole identity needs replacing. Either way, the starting point is an honest conversation about what your brand is currently communicating and what you need it to say.</p>

      <p>If any of the signs above sound familiar, we're happy to take a look at where you are and advise on what a realistic rebrand would involve for your specific business.</p>
    `.trim(),
  },

  {
    id: "post-print-finishes",
    title: "Matt, Gloss, or Soft-Touch? How to Choose the Right Print Finish",
    slug: "matt-gloss-soft-touch-print-finish-guide",
    excerpt:
      "The finish on your printed materials affects how customers perceive your brand more than most people realise. Here's a plain-language guide to the three main options.",
    coverImageSeed: "scribes-blog-print",
    tags: ["Print", "Design Tips"],
    categorySlug: "print-signage",
    seoTitle:
      "Matt vs Gloss vs Soft-Touch Print Finish: Which is Right for Your Business?",
    seoDescription:
      "Not sure which print finish to choose for your business cards or brochures? Scribes Creative Solutions explains the difference between matt, gloss, and soft-touch lamination.",
    publishedAt: "2026-04-22",
    content: `
      <p>When you order printed materials — whether business cards, brochures, or flyers — one of the decisions you'll face is the finish. Most print shops offer at least three options: matt, gloss, and soft-touch (sometimes called velvet). The right choice depends on your brand, your content, and how the material will be used.</p>

      <h2>Gloss finish</h2>
      <p>A gloss laminate adds a shiny, reflective coating to the surface of your print. It makes colours appear more vivid and saturated, which is why it's a popular choice for promotional flyers, product catalogues, and materials where photography is the main feature.</p>

      <p><strong>Best for:</strong> Flyers, product brochures, event posters, and anything with large, bright images you want to pop.</p>

      <p><strong>Things to consider:</strong> Gloss can catch light at certain angles, making text harder to read. It also picks up fingerprints easily, which can be an issue for items handled frequently like menus or leaflets.</p>

      <h2>Matt finish</h2>
      <p>Matt lamination gives your printed piece a smooth, non-reflective surface. It tends to read as more professional and understated — which is why it's the go-to for business cards, letterheads, and corporate brochures. Text is easy to read at any angle, and the lack of shine gives it a premium feel without being flashy.</p>

      <p><strong>Best for:</strong> Business cards, company profiles, letterheads, brochures for professional services, and any print where readability is the priority.</p>

      <p><strong>Things to consider:</strong> Colours can appear slightly muted compared to gloss. If your design is highly photographic and colour intensity is important, test a sample first.</p>

      <h2>Soft-touch (velvet) finish</h2>
      <p>Soft-touch lamination is the most premium of the three options. It creates a velvety, tactile surface that feels almost suede-like when you run your finger across it. The effect is immediate — people who pick up a soft-touch business card almost always comment on how it feels. It signals quality before the person has read a single word.</p>

      <p><strong>Best for:</strong> Premium business cards, high-end brochures, wedding stationery, and any material where the first impression needs to feel luxurious.</p>

      <p><strong>Things to consider:</strong> Soft-touch costs more than matt or gloss. It's also more susceptible to scuffs and light scratches on the surface. For items that will be handled repeatedly, it's worth thinking about whether the premium feel justifies the extra cost and care needed.</p>

      <h2>Which should you choose?</h2>
      <p>A simple way to decide: if your materials are image-heavy and promotional, lean gloss. If they're professional documents or brand collateral, go matt. If you want to make a statement and your budget allows for it, soft-touch is hard to beat.</p>

      <p>If you're not sure, ask us for a sample before committing to a full print run. Seeing and feeling the difference in person makes the decision much easier.</p>
    `.trim(),
  },

  {
    id: "post-business-cards-still-matter",
    title: "Why Your Business Card Still Matters in 2026",
    slug: "why-business-cards-still-matter-2026",
    excerpt:
      "In a world where everyone is sharing contacts via phone, a physical business card still closes deals in a way digital can't. Here's why — and how to make yours count.",
    coverImageSeed: "scribes-blog-bizcard",
    tags: ["Branding", "Print", "Business Tips"],
    categorySlug: "branding-design",
    seoTitle:
      "Why Business Cards Still Matter in 2026 | Scribes Creative Solutions Nairobi",
    seoDescription:
      "Think business cards are outdated? Think again. Scribes explains why a well-designed business card still converts leads better than a phone number swap — and how to get yours right.",
    publishedAt: "2026-03-15",
    content: `
      <p>Every few years, someone declares the business card dead. Digital contact sharing exists. LinkedIn exists. WhatsApp exists. And yet, in a meeting room, at a trade fair, or after a site visit, the business card is still being exchanged — and still doing something a phone number swap cannot.</p>

      <h2>Physical things carry a different kind of trust</h2>
      <p>When you hand someone a business card, you're giving them something tangible. It sits on their desk. It goes into their wallet. It comes out when they're looking for someone who does what you do. A contact saved in a phone is invisible until actively searched for — and most people's phones are cluttered with hundreds of saved contacts they'll never call. A physical card is different. It has presence.</p>

      <p>There's also something to the act of handing someone a card. It's a small gesture that signals you take your business seriously enough to have invested in proper materials. Pulling out a poorly printed card — or worse, scribbling your number on a scrap of paper — communicates the opposite.</p>

      <h2>The card is a sample of your work</h2>
      <p>For anyone in a visual or service business, your business card is a sample of the quality you deliver. A designer, photographer, print shop, or branding studio handing over a cheap, thin card is telling potential clients exactly what to expect. A well-printed card on quality stock, with a considered design and the right finish, says: <em>this is the standard we work to</em>.</p>

      <p>It doesn't need to be elaborate. It needs to be good.</p>

      <h2>What makes a business card actually work</h2>
      <p>A card that converts has a few things in common:</p>

      <ul>
        <li><strong>It's clear about what you do.</strong> Your name and title should tell someone exactly what service or product you provide — don't make people guess.</li>
        <li><strong>It has one strong call to action.</strong> Whether that's a phone number, a WhatsApp link, or a website, make it obvious how someone should reach you. Not five options — one primary one.</li>
        <li><strong>It looks like your brand.</strong> Your logo, colours, and fonts should match everything else a client sees from you. A card that looks different from your signage or website creates confusion.</li>
        <li><strong>The paper weight and finish are right for your business.</strong> For most professional businesses, 350gsm with a matt or soft-touch finish is the baseline. Anything lighter or cheaper-feeling undermines the impression you're trying to create.</li>
      </ul>

      <h2>How many should you order?</h2>
      <p>The common mistake is ordering too few. Cards cost less per unit in larger quantities, and running out at a critical moment — a trade fair, a client meeting, a networking event — means missed opportunities. For most businesses, 250–500 cards at a time is a sensible starting point. Keep a stack in your car, your bag, your desk, and anywhere you regularly meet people.</p>

      <p>If your details change, update the design before your next reorder — never cross out a number or write over a printed address.</p>

      <h2>The bottom line</h2>
      <p>Business cards are not a legacy habit that technology has made obsolete. They're a low-cost, high-impact marketing tool that keeps working long after the conversation that introduced them. Done well, they're one of the best returns on investment a small or growing business can make.</p>
    `.trim(),
  },
];
