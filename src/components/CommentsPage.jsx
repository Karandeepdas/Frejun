import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function CommentsPage({ searchQuery }) {
  const [comments, setComments] = useState([]);
  const [postsMap, setPostsMap] = useState({});
  const [editedComments, setEditedComments] = useState({});
  const [editingRows, setEditingRows] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      const commentsRes = await axios.get('https://jsonplaceholder.typicode.com/comments');
      setComments(commentsRes.data);

      const postsRes = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const map = {};
      postsRes.data.forEach(post => { map[post.id] = post.title; });
      setPostsMap(map);
    }
    fetchData();

    
    const stored = localStorage.getItem('editedComments');
    if (stored) {
      setEditedComments(JSON.parse(stored));
    }
  }, []);

  
  const toggleEdit = (id) => {
    if (editingRows[id]) {
   
      localStorage.setItem('editedComments', JSON.stringify(editedComments));
    }
    setEditingRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  
  const handleFieldChange = (id, field, value) => {
    setEditedComments(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

 
  const mergedComments = comments.map(c => {
    const edited = editedComments[c.id] || {};
    return {
      ...c,
      name: edited.name !== undefined ? edited.name : c.name,
      body: edited.body !== undefined ? edited.body : c.body
    };
  });

  
  const filtered = mergedComments.filter(c =>
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Body</th>
            <th>Post</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(c => {
            const isEditing = editingRows[c.id];
            return (
              <tr key={c.id}>
                <td>{c.email}</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={c.name}
                      onChange={(e) => handleFieldChange(c.id, 'name', e.target.value)}
                    />
                  ) : (
                    c.name
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <textarea
                      className="form-control"
                      value={c.body}
                      onChange={(e) => handleFieldChange(c.id, 'body', e.target.value)}
                    />
                  ) : (
                    c.body
                  )}
                </td>
                <td>{postsMap[c.postId]}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    style={{ backgroundColor: 'grey', color: 'white' }}
                    onClick={() => toggleEdit(c.id)}
                  >
                    {isEditing ? 'Save' : 'Edit'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={(selectedItem) => setCurrentPage(selectedItem.selected + 1)}
          containerClassName={'pagination justify-content-center flex-wrap'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
}

export default CommentsPage;
