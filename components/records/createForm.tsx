"use client";
import { CategoryTable, MemberTable } from "@/lib/definitions";
import Form from "./create/Form";
import { useFormState } from "react-dom";
import { State, createRecord } from "@/lib/records/action";

type Props = {
  categories: CategoryTable[];
  members: MemberTable[];
  type: "IN" | "OUT";
};

export default function CreateForm(props: Props) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState<State, FormData>(
    (state, formData) => createRecord(state, formData, props.type),
    initialState
  );
  return <Form formAction={dispatch} state={state} {...props} />;
}
