import { Accordion, AccordionItem } from '@nextui-org/react';

const Help = () => {
  const helpTopics = [
    {
      question: 'Как принять участие?',
      answer:
        'Подача работы на конференцию осуществляется путем заполнения данных в модальном окне и загрузки документа',
    },
    {
      question: 'Можно ли подавать заявку без регистрации?',
      answer: 'Нет. Подача заявки возможна только после прохождения регистрации на сайте',
    },
    {
      question: 'Как связаться с администрацией?',
      answer: 'Справочная БНТУ: +375 17 292-10-11, +375 17 293-93-30',
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
