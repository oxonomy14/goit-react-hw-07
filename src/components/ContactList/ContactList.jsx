import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { RiContactsBookLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import {
  selectContacts,
  selectLoading,
  selectError,
  selectFilteredContacts,
} from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filterSlice";

import { BarLoader } from "react-spinners";
import toast from "react-hot-toast";

const ContactList = () => {
  //const contacts = useSelector(selectContacts);
  const contacts = useSelector(selectFilteredContacts);
  const filter = useSelector(selectNameFilter);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  // Фільтрація контактів по імені
  //const filteredContacts = contacts.filter((item) =>
  // item.name.toLowerCase().includes(filter.toLowerCase())
  // );

  return (
    <>
      <div className={css.wrapperContactList}>
        <h2 className={css.titleContactList}>
          <RiContactsBookLine size={48} className={css.icon} />
          My Contacts List
        </h2>
        {loading && (
          <BarLoader
            cssOverride={{
              display: "block",
              margin: "15px auto",
            }}
            color="red"
          />
        )}
        {error && <h2>Server is dead...</h2>}

        {!loading &&
          !error &&
          (contacts.length > 0 ? (
            <ul className={css.contactList}>
              {contacts.map((item) => (
                <Contact key={item.id} item={item} />
              ))}
            </ul>
          ) : (
            <p>No contacts match your search</p>
          ))}
      </div>
    </>
  );
};

export default ContactList;
