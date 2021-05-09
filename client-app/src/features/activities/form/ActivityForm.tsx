import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer(function ActivityForm() {
  const {activityStore} = useStore();
  const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  }; 

  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    activity.id ? updateActivity(activity) : createActivity(activity)
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      let {name, value} = event.target;
      setActivity({...activity, [name]: value});
  }
  return (
    <Segment clearing>
      <Form onSubmit={() => handleSubmit()} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          onChange={handleInputChange}
          name="title"
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          onChange={handleInputChange}
          name="description"
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          onChange={handleInputChange}
          name="category"
        />
        <Form.Input
          placeholder="Date"
          value={activity.date}
          onChange={handleInputChange}
          name="date"
          type="date"
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          onChange={handleInputChange}
          name="city"
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          onChange={handleInputChange}
          name="venue"
        />
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="submit"
          content="Cancel"
          onClick={() => closeForm()}
        />
      </Form>
    </Segment>
  );
})
