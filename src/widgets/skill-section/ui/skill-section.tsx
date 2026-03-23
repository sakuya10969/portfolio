import { getSkills } from "@/entities/skill";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

const proficiencyLabel = {
  beginner: "初級",
  intermediate: "中級",
  advanced: "上級",
  expert: "エキスパート",
};

const proficiencyColor = {
  beginner: "bg-muted",
  intermediate: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  advanced: "bg-green-500/20 text-green-700 dark:text-green-300",
  expert: "bg-purple-500/20 text-purple-700 dark:text-purple-300",
};

export async function SkillSection() {
  const categories = await getSkills();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle className="text-lg">{category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-1.5">
                  <Badge
                    variant="secondary"
                    className="text-sm"
                  >
                    {skill.name}
                  </Badge>
                  {skill.proficiency && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-sm ${proficiencyColor[skill.proficiency]}`}>
                      {proficiencyLabel[skill.proficiency]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
