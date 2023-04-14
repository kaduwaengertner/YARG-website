import { FC } from 'react';
import Image from 'next/image';

interface Command {
  category: string;
  command_EN: string;
  command_PTBR: string;
  description: string;
  name: string;
  status: string;
  permissions?: string[];
  command_type: string;
}

interface CommandViewProps {
  command: Command;
  category: string;
}

const CommandView: FC<CommandViewProps> = ({ command, category }) => {
  return (
    <div className="command-view">
      <div className="command-main">
        <div className="command-name">!<span className="command-name-clean">{command.name}</span></div>
        <div className="command-description">{command.description}</div>
      </div>
      <div className="command-extras">
        {command.permissions && command.permissions.length > 0 && (
          <div className="command-permissions">
            {command.permissions.map((permission) => (
              <span key={permission} className={`command-permission-tag command-permission-${permission}`}>
                <Image src={`/assets/permissions/${permission}.png`} width="20" alt=""/>
                {permission}
              </span>
            ))}
          </div>
        )}
        {command.command_type === "advanced" && (
          <div className="command-permission-tag command-permission-live">
            <Image src={`/assets/permissions/live.png`} width="20" alt=""/>
            LIVE
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandView;
