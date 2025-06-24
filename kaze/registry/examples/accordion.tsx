import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/registry/ui/accordion'

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

  return (
    <Accordion className="w-[500px]" openMultiple={false}>
      {faqs.map((faq) => (
        <AccordionItem key={faq.id}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>
            <p className="pb-4 text-balance">{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
