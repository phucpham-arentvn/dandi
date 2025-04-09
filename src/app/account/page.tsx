import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings - My Account",
  description: "Manage your account settings and preferences",
};

export default function AccountPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-8">
        <ul>
          <li>Pages</li>
          <li>My Account</li>
          <li>Settings</li>
        </ul>
      </div>

      <h1 className="text-4xl font-bold mb-12">Settings</h1>

      {/* Account Settings Card */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <div className="flex flex-col gap-8">
            {/* Account Name */}
            <div>
              <h3 className="text-base font-medium mb-2">Account name</h3>
              <p className="text-gray-600">infinity phucpham</p>
            </div>

            {/* Associated Email */}
            <div>
              <h3 className="text-base font-medium mb-2">Associated email</h3>
              <p className="text-gray-600">phucpham.infinity@gmail.com</p>
            </div>

            {/* Email Usage Alerts */}
            <div>
              <h3 className="text-base font-medium mb-4">Email usage alerts</h3>
              <p className="text-gray-600 mb-4">
                An alert will be sent to your email when your monthly usage
                reaches the set threshold.
              </p>

              <div className="flex items-center gap-4">
                <div className="join">
                  <input
                    type="number"
                    className="input input-bordered join-item w-24"
                    defaultValue={90}
                  />
                  <span className="join-item flex items-center px-4 bg-base-200">
                    %
                  </span>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      defaultChecked
                    />
                    <span className="label-text ml-2">Enabled</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Query Data Usage */}
            <div>
              <h3 className="text-base font-medium mb-4">
                Allow use of query data
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="badge badge-success">ON</div>
                  <p className="text-gray-600">
                    — We may use queries to improve the quality of our services.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="badge badge-error">OFF</div>
                  <p className="text-gray-600">
                    — We will not save your queries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
