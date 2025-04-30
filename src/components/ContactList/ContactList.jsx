import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { RiContactsBookLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const ContactList = () => {
  const contacts = useSelector((state) => state.contactList.contacts.items);
  const filter = useSelector((state) => state.filters.name);

  // Фільтрація контактів по імені
  const filteredContacts = contacts.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className={css.wrapperContactList}>
        <h2 className={css.titleContactList}>
          <RiContactsBookLine size={48} className={css.icon} />
          My Contacts List
        </h2>
        <ul className={css.contactList}>
          {filteredContacts.map((item) => (
            <Contact key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ContactList;
