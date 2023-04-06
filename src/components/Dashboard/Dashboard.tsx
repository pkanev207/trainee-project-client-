import BookForm from "../BookForm/BookForm";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  return (
    <div>
      <h3>This is the Dashboard</h3>
      <BookForm />
    </div>
  );
}
