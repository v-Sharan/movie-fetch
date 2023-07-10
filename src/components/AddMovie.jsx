import React, { useState } from "react";

const AddMovie = ({ handleFunction }) => {
  const [form, setForm] = useState({
    title: "",
    opening_crawl: "",
    release_date: "",
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleFunction(form);
      }}
    >
      <div className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </div>
      <div className="control">
        <label htmlFor="opening_crawl">Opening text</label>
        <textarea
          rows={"5"}
          name="opening_crawl"
          type="text"
          value={form.Opening}
          onChange={handleChange}
        />
      </div>
      <div className="control">
        <label htmlFor="release_date">Relase Date</label>
        <input
          name="release_date"
          type={"date"}
          value={form.date}
          onChange={handleChange}
        />
      </div>
      <button>Add Movie</button>
    </form>
  );
};

export default AddMovie;
