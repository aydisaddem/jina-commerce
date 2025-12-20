import { useEffect, useState } from "react";
import "../../styles/passwordStrengthMeter.css"

const PasswordStrengthMeter = ({ password }) => {
  const [strength, setStrength] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    setStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    });
  }, [password]);

    const calculateStrengthScore = (strength) => {
    let score = 0;
    if (strength.length) score++;
    if (strength.uppercase) score++;
    if (strength.number) score++;
    return score;
  };

  return (
 <>
    <div className="strength-meter">
            <div className="strength-bar">
              <div
                className={`strength-fill score-${calculateStrengthScore(
                  strength
                )}`}
              />
            </div>
            <span
              className={`strength-label score-${calculateStrengthScore(
                strength
              )}`}
            >
              {calculateStrengthScore(strength) === 1 && "Weak"}
              {calculateStrengthScore(strength) === 2 && "Medium"}
              {calculateStrengthScore(strength) === 3 && "Strong"}
            </span>
          </div>

          <div className="strength-rules">
            <p className={strength.length ? "valid" : "invalid"}>
              {strength.length ? "✔" : "✖"} 8 characters
            </p>
            <p className={strength.uppercase ? "valid" : "invalid"}>
              {strength.uppercase ? "✔" : "✖"} 1 uppercase
            </p>
            <p className={strength.number ? "valid" : "invalid"}>
              {strength.number ? "✔" : "✖"} 1 number
            </p>
          </div>
 </>
  );
};

export default PasswordStrengthMeter;
