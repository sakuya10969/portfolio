import { getExperiences } from '@/entities/experience';
import { Badge } from '@/shared/ui/badge';
import { Briefcase, GraduationCap, Activity } from 'lucide-react';

const typeConfig = {
  work: {
    label: '職歴',
    icon: Briefcase,
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  education: {
    label: '学歴',
    icon: GraduationCap,
    color: 'bg-green-500/10 text-green-600 dark:text-green-400',
  },
  activity: {
    label: '活動',
    icon: Activity,
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  },
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short' });
}

export async function ExperienceSection() {
  const experiences = await getExperiences();

  return (
    <div className="relative space-y-8">
      {/* Timeline line */}
      <div className="bg-border absolute top-0 bottom-0 left-6 hidden w-px sm:block" />

      {experiences.map((exp) => {
        const config = typeConfig[exp.type];
        const Icon = config.icon;

        return (
          <div key={exp.id} className="relative flex gap-6">
            {/* Timeline dot */}
            <div className="border-border bg-background relative z-10 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 sm:flex">
              <Icon className="text-muted-foreground h-5 w-5" />
            </div>

            <div className="flex-1 pb-8">
              <div className="mb-2 flex flex-wrap items-start gap-2">
                <Badge variant="outline" className={`text-xs ${config.color}`}>
                  {config.label}
                </Badge>
                <span className="text-muted-foreground text-xs">
                  {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : '現在'}
                </span>
              </div>
              <h3 className="text-base font-semibold">{exp.role}</h3>
              <p className="text-muted-foreground mb-2 text-sm">{exp.organization}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
