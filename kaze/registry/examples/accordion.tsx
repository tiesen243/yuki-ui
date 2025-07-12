import { Accordion, AccordionItem } from '@/registry/ui/accordion'

export default function AccordionDemo() {
  const faqs = [
    {
      id: 'getting-started',
      question: 'How do I get started with this component library?',
      answer:
        'Install the package using npm or yarn, then import the components you need. Check our documentation for detailed setup instructions and examples.',
    },
    {
      id: 'customization',
      question: 'Can I customize the styling?',
      answer:
        'Yes! All components are built with Tailwind CSS and support custom styling through className props. You can also override CSS variables for theme customization.',
    },
    {
      id: 'accessibility',
      question: 'Are the components accessible?',
      answer:
        'Absolutely. All components follow WAI-ARIA guidelines and are tested with screen readers. They include proper keyboard navigation and focus management.',
    },
    {
      id: 'typescript',
      question: 'Does it work with TypeScript?',
      answer:
        "Yes, the library is built with TypeScript and includes full type definitions. You'll get excellent IntelliSense and type safety out of the box.",
    },
  ]

  return (['default', 'shadow', 'border', 'split'] as const).map((variant) => (
    <Accordion
      className="w-[400px]"
      variant={variant}
      defaultValue="getting-started"
      key={variant}
    >
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={faq.id}
          title={faq.question}
          subtitle="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        >
          {faq.answer}
        </AccordionItem>
      ))}
    </Accordion>
  ))
}
