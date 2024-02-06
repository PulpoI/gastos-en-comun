import React, { useState } from "react";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { IconContext } from "react-icons";

interface Faq {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqs: Faq[] = [
    {
      question: "¿Qué es Gastos compartidos?",
      answer:
        "Gastos compartidos es una aplicación diseñada para facilitar la gestión de gastos compartidos entre grupos de usuarios. Permite a los usuarios llevar un registro de los gastos comunes, calcular deudas y simplificar el proceso de manejo financiero en grupos.",
    },
    {
      question: "¿Cómo puedo empezar a usar la aplicación?",
      answer:
        "Para comenzar a utilizar Gastos compartidos, simplemente crea una cuenta, inicia sesión y crea o únete a un grupo existente. Desde allí, puedes empezar a registrar gastos y gestionar las deudas compartidas.",
    },
    {
      question: "¿Cómo se registran los gastos en la aplicación?",
      answer:
        "Para registrar un gasto, selecciona el grupo al que pertenece y proporciona detalles como la descripción, el monto y los participantes. Puedes asignar gastos a usuarios específicos y dividir los costos de manera equitativa.",
    },
    {
      question: "¿Cómo se manejan los usuarios no registrados en un grupo?",
      answer:
        "Gastos compartidos permite la creación de usuarios no registrados para simplificar la gestión de gastos en grupos. Puedes asignar gastos a estos usuarios ficticios y luego convertirlos en usuarios registrados cuando sea necesario.",
    },
    {
      question: "¿Cómo se calculan las deudas y los montos a recibir?",
      answer:
        "La aplicación realiza automáticamente cálculos detallados sobre quién debe cuánto y a quién. Utiliza la información de gastos para determinar las deudas y los montos a recibir entre los miembros del grupo, facilitando la contabilidad compartida.",
    },
    {
      question: "¿Qué es el 'Ajuste de cuentas' y cómo funciona?",
      answer:
        "El Mensaje de Deudas es una característica que proporciona una descripción detallada de las deudas y los montos a recibir. Te guía sobre quién debe pagar a quién y cuánto. Puedes acceder a esta información para una comprensión clara de las transacciones necesarias.",
    },
    {
      question: "¿Es segura la información financiera en la aplicación?",
      answer:
        "La seguridad de tus datos es una prioridad. Gastos compartidos utiliza medidas de seguridad robustas para proteger la información financiera y garantizar la privacidad de los usuarios.",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 my-10">
      <div className="container max-w-4xl pb-0 md:pb-20 px-6 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white">
          Preguntas frecuentes
        </h1>
        <div className="mt-12 space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-2 border-gray-100 rounded-lg dark:border-gray-700 ${
                index === activeIndex ? "mb-8" : "mb-0"
              }`}
            >
              <button
                className="flex items-center justify-between w-full p-8 gap-2"
                onClick={() => handleToggle(index)}
              >
                <h2 className="font-semibold text-gray-700 dark:text-white text-start">
                  {faq.question}
                </h2>
                <span
                  className={`text-white dark:bg-gray-900 rounded-full${
                    index === activeIndex && "transform rotate-180"
                  }`}
                >
                  {index === activeIndex ? (
                    <IconContext.Provider value={{ size: "20px" }}>
                      <FaCircleMinus />
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider value={{ size: "20px" }}>
                      <FaCirclePlus />
                    </IconContext.Provider>
                  )}
                </span>
              </button>
              {index === activeIndex && (
                <>
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
