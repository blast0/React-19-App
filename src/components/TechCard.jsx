import Lottie from "lottie-react";

export const TechCard = ({ skill }) => (
  <div className="flex hover:-translate-y-4 transition-all flex-col items-center py-2 rounded-xl bg-[#d9ecec0c] shadow-sm">
    <div style={{ width: skill.size, height: skill.size, marginTop: skill.top ?? 0 }}>
      <Lottie animationData={skill.animation} loop />
    </div>
    <span className="text-sm" style={{ marginTop: skill.labelMargin ?? 0 }}>
      {skill.label}
    </span>
  </div>
);
