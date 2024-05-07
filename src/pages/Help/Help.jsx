import { Accordion, AccordionItem } from '@nextui-org/react';

const Help = () => {
  const helpTopics = [
    {
      question: 'Как принять участие?',
      answer: 'Необходимо создать аккаунт, и в разделе с выбранной конференцией подать заявку',
    },
  ];

  return (
    <div className="w-full lg:px-16">
      <div className="text-center my-10">
        <h1 className="mb-2 font-bold text-4xl">Помощь</h1>
        <h5 className="text-default-500 text-lg">
          Инструкции для участия в студенческих научно-технических конференций БНТУ
        </h5>
      </div>
      <Accordion>
        {helpTopics.map((item, index) => (
          <AccordionItem key={index} aria-label={`Accordion ${index}`} title={item.question}>
            {item.answer}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Help;
