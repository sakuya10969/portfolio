import { getSkills } from '@/entities/skill';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { TechnologyBadge } from '@/shared/ui/technology-badge';

const proficiencyLabel = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級',
  expert: 'エキスパート',
};

const proficiencyColor = {
  beginner: 'bg-muted text-muted-foreground',
  intermediate: 'bg-blue-500/15 text-blue-700 dark:text-blue-300',
  advanced: 'bg-green-500/15 text-green-700 dark:text-green-300',
  expert: 'bg-purple-500/15 text-purple-700 dark:text-purple-300',
};

export async function SkillSection() {
  const categories = await getSkills();

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle className="text-lg">{category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => {
                // technology.name が存在する場合はそちらをアイコン解決に使う
                const displayName = skill.technology?.name ?? skill.name;
                return (
                  <div key={skill.id} className="flex items-center gap-1">
                    <TechnologyBadge name={displayName} size="sm" />
                    {skill.proficiency && (
                      <span
                        className={`rounded-sm px-1.5 py-0.5 text-xs font-medium ${proficiencyColor[skill.proficiency]}`}
                      >
                        {proficiencyLabel[skill.proficiency]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
