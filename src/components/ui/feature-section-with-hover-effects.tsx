
import { cn } from "@/lib/utils";
import {
  IconBriefcase,
  IconSchool,
  IconUsers,
  IconBulb,
  IconCurrencyDollar,
  IconTrophy,
  IconCalendar,
  IconRocket,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Jobs & Careers",
      description:
        "Discover professional opportunities from leading organizations worldwide.",
      icon: <IconBriefcase />,
    },
    {
      title: "Scholarships",
      description:
        "Access educational funding opportunities from universities and foundations globally.",
      icon: <IconSchool />,
    },
    {
      title: "Fellowships",
      description:
        "Find prestigious fellowship programs to advance your research and career.",
      icon: <IconUsers />,
    },
    {
      title: "Career Development",
      description: "Get expert tips and guidance to accelerate your professional growth.",
      icon: <IconBulb />,
    },
    {
      title: "Grants & Funding",
      description: "Explore funding opportunities for your projects and initiatives.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Competitions",
      description:
        "Participate in competitions and showcase your skills to win amazing prizes.",
      icon: <IconTrophy />,
    },
    {
      title: "Events & Conferences",
      description:
        "Stay updated with the latest industry events and networking opportunities.",
      icon: <IconCalendar />,
    },
    {
      title: "Entrepreneurship",
      description: "Launch your startup with funding and mentorship opportunities.",
      icon: <IconRocket />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-gray-200",
        (index === 0 || index === 4) && "lg:border-l border-gray-200",
        index < 4 && "lg:border-b border-gray-200"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-blue-50 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-blue-600">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-300 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-gray-800">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-600 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
