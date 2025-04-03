import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Button = styled.button`
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  margin: 0.5em;
  padding: 0.75em 1em;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const Input = styled.input`
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s ease-in-out;
  margin-left: 1rem;
  margin-bottom: 1rem;
  width &:focus {
    border-color: #ff7e5f;
    box-shadow: 0px 0px 8px rgba(255, 126, 95, 0.5);
  }
`;

export const Navigation = styled.nav`
  background: #222;
  padding: 1.5em 2em;
  width: 100%;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);

  a {
    color: black;
    text-decoration: none;
    font-size: 1.1rem;
    margin: 0 1em;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: #ff7e5f;
    }
  }
`;

export const BlogTitle = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Page = styled.div`
  padding-top: 5rem;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;
`;

export const BlogCard = styled.div`
  width: 100%;
  margin: 1rem;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #feb47b;
  }
`;

export const TableWrapper = styled.div`
  background-image: linear-gradient(135deg, #af5134, rgb(245, 204, 173));
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin-bottom: 20px;
`;

export const TableHeader = styled.th`
  color: black;
  padding: 12px 15px;
  text-align: left;
  font-size: 1.1em;
`;

export const TableRow = styled.tr``;

export const TableData = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
`;

export const UserContainer = styled.div`
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 2rem auto;
  font-family: 'Poppins', sans-serif;
`;

export const UserHeader = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
`;

export const UserSubheading = styled.h4`
  font-size: 1.4rem;
  color: white;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const BlogList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const BlogListItem = styled.li`
  background: rgba(255, 255, 255, 0.8);
  padding: 10px 15px;
  border-radius: 8px;
  margin: 10px 0;
  font-size: 1.1rem;
  color: #333;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

export const BlogContainer = styled.div`
  background-image: linear-gradient(135deg, #af5134, rgb(245, 204, 173));
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 100%;
  margin: 2rem auto;
  font-family: 'Poppins', sans-serif;
  color: #333;
`;

export const BlogLink = styled.a`
  color: #4682b4;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  margin-bottom: 1rem;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;

export const CancelButton = styled.button`
  background: linear-gradient(135deg, #ff4e50, #ff6a00);
  border: none;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background: #ff2a1d;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

export const CommentsSection = styled.div`
  margin-top: 2rem;
  border-top: 2px solid #ddd;
  padding-top: 1rem;
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

export const CommentItem = styled.li`
  background: white;
  padding: 1rem;
  margin: 0.8rem 0;
  border-radius: 8px;
  font-size: 1rem;
  color: #555;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #af5134;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
  font-family: 'Poppins', sans-serif;
`;

export const LoginForm = styled.form`
  background: #fff;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: #333;
  font-size: 1rem;
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TitleInput = styled.b`
  width: 100%;
  max-width: 400px;
  font-weight: bold;
  border-radius: 25px;
  outline: none;
  color: black;
  transition: all 0.3s ease-in-out;

  &::placeholder {
    color: #ff4500;
    font-weight: normal;
  }

  &:hover {
    color: #ff4500;
    shadow: 0 0 15px rgba(255, 69, 0, 0.6);
  }
`;

export const TruncatedText = styled.span`
  padding: 0.3rem 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 100%;
`;

export const CreateBlogContainer = styled.div`
  background: #b45b3e;
  border-radius: 1rem;
  padding: 1rem;
`;
