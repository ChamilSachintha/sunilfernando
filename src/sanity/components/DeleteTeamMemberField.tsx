"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useClient, useFormValue } from "sanity";
import { Button, Card, Flex, Text } from "@sanity/ui";

export function DeleteTeamMemberField() {
  const router = useRouter();
  const client = useClient({ apiVersion: "2025-01-01" });
  const docId = useFormValue(["_id"]) as string | undefined;
  const docName = useFormValue(["name"]) as string | undefined;
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    if (!docId) return;
    setDeleting(true);
    try {
      const cleanId = docId.replace(/^drafts\./, "");
      // Delete both published and draft versions
      await client.delete(cleanId).catch(() => {});
      await client.delete(`drafts.${cleanId}`).catch(() => {});
      setDeleted(true);
      setTimeout(() => {
        router.push("/studio/structure/teamMember");
      }, 500);
    } catch (err) {
      alert(
        `Failed to delete member: ${err instanceof Error ? err.message : String(err)}`
      );
      setDeleting(false);
      setConfirming(false);
    }
  };

  if (deleted) {
    return (
      <Card padding={3} radius={2} tone="critical">
        <Text size={1} weight="semibold">
          Member deleted. Returning to list...
        </Text>
      </Card>
    );
  }

  return (
    <Card padding={3} radius={2} tone="critical" border>
      <Flex direction="column" gap={3}>
        <Flex justify="space-between" align="center" gap={3}>
          <Flex direction="column" gap={2}>
            <Text size={1} weight="semibold">
              Permanent Deletion
            </Text>
            <Text size={1} muted>
              Permanently delete {docName ? `"${docName}"` : "this member"} from the CMS.
            </Text>
          </Flex>
          {!confirming ? (
            <Button
              tone="critical"
              mode="ghost"
              text="Delete Team Member"
              onClick={() => setConfirming(true)}
            />
          ) : (
            <Flex gap={2}>
              <Button
                mode="bleed"
                text="Cancel"
                disabled={deleting}
                onClick={() => setConfirming(false)}
              />
              <Button
                tone="critical"
                text={deleting ? "Deleting..." : "Yes, Delete Permanently"}
                disabled={deleting}
                onClick={handleDelete}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
