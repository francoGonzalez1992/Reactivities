import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Grid, Header, Tab, Input, TextArea } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

export default observer(function ProfileAbout({ profile }: Props) {
  const {
    profileStore: { isCurrentUser, updateProfile, loading },
  } = useStore();
  const [editAboutMode, setEditAboutMode] = useState(false);
  const [bio, setBio] = useState(profile.bio || "");
  const [displayName, setDisplayName] = useState(profile.displayName || "");

  function handleUpdateDisplayName(e: SyntheticEvent<HTMLInputElement>) {
    setDisplayName(e.currentTarget.value);
  }

  function handleUpdateBio(e: SyntheticEvent<HTMLTextAreaElement>) {
    setBio(e.currentTarget.value);
  }

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editAboutMode ? "Cancel" : "Edit Profile"}
              color={editAboutMode ? "red" : "teal"}
              onClick={() => setEditAboutMode(!editAboutMode)}
            />
          )}
        </Grid.Column>
        {editAboutMode && (
          <>
            <Grid.Column width={16}>
              <Input
                placeholder={"Name"}
                value={displayName}
                onChange={(e) => handleUpdateDisplayName(e)}
                fluid
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <TextArea
                placeholder={"Your Bio"}
                value={bio}
                onChange={(e) => handleUpdateBio(e)}
                rows={4}
                style={{ width: "100%", resize: "none" }}
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Button
                floated="right"
                color="green"
                content="Update Profile"
                loading={loading}
                onClick={() => {
                  updateProfile(displayName, bio);
                  setEditAboutMode(false);
                }}
              />
            </Grid.Column>
          </>
        )}
      </Grid>
    </Tab.Pane>
  );
});
