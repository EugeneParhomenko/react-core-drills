import { useState } from 'react';

export type ProfileFormSkillsProps = {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
};

export function ProfileFormSkills({
  skills,
  onSkillsChange,
}: ProfileFormSkillsProps) {
  const [newSkill, setNewSkill] = useState<string | null>(null);

  const handleAddNewSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill.length > 0) {
      const newSkills = [...skills, trimmedSkill];
      onSkillsChange(newSkills);
    }
  };

  const handleSkillRemove = (skill: string) => {
    const newSkills = skills.filter((s) => s !== skill);
    onSkillsChange(newSkills);
  };

  const handleNewSkillKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (newSkill == null) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      const trimmedNewSkill = newSkill.trim();
      const existingSkill = skills.find((s) => s === trimmedNewSkill);
      if (trimmedNewSkill.length > 0 && !existingSkill) {
        handleAddNewSkill(trimmedNewSkill);
        setNewSkill(null);
      }
    } else if (event.key === 'Escape') {
      setNewSkill(null);
    }
  };

  const handleNewSkillClick = () => {
    setNewSkill('');
  };

  return (
    <div className="profile-skills">
      {skills.map((skill) => (
        <div key={skill} className="profile-skill">
          <span>{skill}</span>
          <button type="button" onClick={() => handleSkillRemove(skill)}>
            ✕
          </button>
        </div>
      ))}
      {newSkill !== null ? (
        <label className="profile-skill-input">
          <input
            type="text"
            autoFocus
            value={newSkill}
            onChange={(event) => setNewSkill(event.target.value)}
            onKeyDown={(event) => handleNewSkillKeyUp(event)}
          />
        </label>
      ) : (
        <button type="button" onClick={handleNewSkillClick}>
          +
        </button>
      )}
    </div>
  );
}
