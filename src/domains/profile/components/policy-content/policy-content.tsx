import { type PolicySection } from '@/domains/profile/model/policy';

interface PolicyContentProps {
  sections: PolicySection[];
}

export const PolicyContent = ({ sections }: PolicyContentProps) => {
  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      {sections.map((section) => (
        <section key={section.title} className="flex flex-col gap-2">
          <h2 className="text-body-sb-16 text-gray-800">{section.title}</h2>
          <div className="text-body-m-15 flex flex-col gap-1 text-gray-800">
            {section.descriptions?.map((description) => (
              <p key={description}>{description}</p>
            ))}
            {section.items && (
              <ul className="list-disc space-y-1 pl-5">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.orderedItems && (
              <ol className="list-decimal space-y-1 pl-5">
                {section.orderedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            )}
            {section.notes?.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
