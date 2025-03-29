import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import CartSummary from '../components/CartSummary';
import { useCart } from '../context/CartContext';

function ProjectsPage() {
  const { selectedCategories, setSelectedCategories } = useCart();
  
  return (
    <div>
      <div className="bg-primary text-white shadow-sm mb-4">
        <div className="container">
          <h2 className="mb-0 py-3">Book List</h2>
        </div>
      </div>
      
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-5">
            <BookList selectedCategories={selectedCategories} />
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="accordion" id="cartAccordion">
                <div className="accordion-item border-0">
                  {/*  This part includes an accordion feature */}
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <span className="fw-bold">Your Cart</span>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#cartAccordion"
                  >
                    <div className="accordion-body p-0">
                      <CartSummary />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
