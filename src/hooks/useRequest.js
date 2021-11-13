import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { request } from "~/utils/request";

export const useRequest = (url, options, id = "") => {
  const [response, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await request.get(url, options);

        setData(response);
      } catch {
        setErrors(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { response, loading, errors };
};

useRequest.propTypes = {
  url: PropTypes.string,
  options: PropTypes.object,
  loading: PropTypes.bool,
  data: PropTypes.shape({
    data: PropTypes.array,
    meta: PropTypes.shape({
      total_results: PropTypes.number,
      total_pages: PropTypes.number,
      page: PropTypes.number,
      per_page: PropTypes.number,
    }),
  }),
  toast: PropTypes.bool,
};
