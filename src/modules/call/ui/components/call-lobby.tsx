import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import {
  Call,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";

import { DefaultVideoPlaceholder } from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  onJoin: () => void;
}

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? "Guest",
          image:
            data?.user.image ??
            generateAvatarUri({
              seed: data?.user.id ?? "",
              variant: "initials",
            }),
        } as StreamVideoParticipant
      }
    />
  );
};

const AllowBrowsetPemissions = () => {
  return (
    <p className="text-sm">
      Please allow browser permissions to use your camera and microphone.
    </p>
  );
};

export const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { hasBrowserPermission: hasMicrophonePermission } =
    useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();

  const hasBrowserMediaPermissions =
    hasCameraPermission && hasMicrophonePermission;

  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      <div className="py-4 px-8 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Ready to join?</h6>
            <p className="text-sm">
              Set up your camera and microphone to start the call
            </p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasBrowserMediaPermissions
                ? DisabledVideoPreview
                : AllowBrowsetPemissions
            }
          />
          <div className="flex gap-y-2">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>
          <div className="flex gap-x-2 justify-between w-full">
            <Button>
              <Link href="/meetings">Cancel</Link>
            </Button>
            <Button onClick={onJoin}>
              <LogInIcon />
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
