import { useState } from 'react';

export type ProfileFormSkillsProps = {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
};

export function ProfileFormSkills({
  skills,
  onSkillsChange,
}: ProfileFormSkillsProps) {
  const [editableSkills, setEditableSkills] = useState<string[]>([...skills]);
  const [newSkill, setNewSkill] = useState<string | null>(null);

  const handleAddNewSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill.length > 0) {
      const newSkills = [...editableSkills, trimmedSkill];
      setEditableSkills(newSkills);
      onSkillsChange(newSkills);
    }
  };

  const handleSkillRemove = (skill: string) => {
    const newSkills = editableSkills.filter((s) => s !== skill);
    setEditableSkills(newSkills);
    onSkillsChange(newSkills);
  };

  const handleNewSkillKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      if (newSkill !== null) {
        const trimmedNewSkill = newSkill.trim();
        if (trimmedNewSkill.length > 0) {
          handleAddNewSkill(trimmedNewSkill);
          setNewSkill(null);
        }
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
      {editableSkills.map((skill) => (
        <div key={skill} className="profile-skill">
          <span>{skill}</span>
          <button onClick={() => handleSkillRemove(skill)}>✕</button>
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
        <button onClick={handleNewSkillClick}>+</button>
      )}
    </div>
  );
}
