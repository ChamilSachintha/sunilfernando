import { useState } from "react";
import {
  type DocumentActionComponent,
  type DocumentActionProps,
  useDocumentOperation,
} from "sanity";

export const DeleteTeamMemberAction: DocumentActionComponent = (
  props: DocumentActionProps
) => {
  const { id, type } = props;
  const { delete: deleteOp } = useDocumentOperation(id, type);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return {
    label: "Delete Member",
    tone: "critical",
    title: "Permanently delete this team member document from the CMS",
    dialog: confirmOpen
      ? {
          type: "confirm",
          onCancel: () => setConfirmOpen(false),
          onConfirm: () => {
            deleteOp.execute();
          },
          message:
            "Are you sure you want to permanently delete this team member from the CMS? This action cannot be undone.",
        }
      : null,
    onHandle: () => {
      setConfirmOpen(true);
    },
  };
};

DeleteTeamMemberAction.action = "delete";
DeleteTeamMemberAction.displayName = "Delete Member";
