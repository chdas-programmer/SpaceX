
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Rocket, ExternalLink, Globe, Youtube, CircleCheck as CheckCircle, Circle as XCircle, Clock, Zap } from 'lucide-react';
import { useSpaceXData } from '../hooks/useSpaceXData';
    

 const MissionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { launches, loading, error } = useSpaceXData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading mission details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading mission details: {error}</p>
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline"
          >
            Return to missions
          </button>
        </div>
      </div>
    );
  }

  const launch = launches.find(l => l.id === id);

  if (!launch) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Mission not found</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Return to missions
          </Link>
        </div>
      </div>
    );
  }

  const launchDate = new Date(launch.date_utc);
  const isSuccessful = launch.success;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Missions
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Mission Patch and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[15px] border border-gray-300 p-6 mb-6">
              {/* Mission Patch */}
              <div className="text-center mb-6">
                {launch.links.patch.large || launch.links.patch.small ? (
                  <img
                    src={launch.links.patch.large || launch.links.patch.small || ''}
                    alt={`${launch.name} mission patch`}
                    className="w-48 h-48 mx-auto object-contain rounded-[15px] bg-gray-50 p-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`w-48 h-48 mx-auto bg-gray-100 rounded-[15px] flex items-center justify-center ${launch.links.patch.large || launch.links.patch.small ? 'hidden' : ''}`}>
                  <Rocket className="h-16 w-16 text-gray-400" />
                </div>
              </div>

              {/* Mission Status */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  isSuccessful === true 
                    ? 'bg-green-100 text-green-800' 
                    : isSuccessful === false 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {isSuccessful === true ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mission Successful
                    </>
                  ) : isSuccessful === false ? (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Mission Failed
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4 mr-2" />
                      Status Unknown
                    </>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {launchDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-gray-500">
                      {launchDate.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <Rocket className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{launch.rocketName}</div>
                    <div className="text-gray-500">Flight #{launch.flight_number}</div>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <Zap className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Mission ID</div>
                    <div className="text-gray-500 font-mono">{launch.id}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* External Links */}
            {(launch.links.wikipedia || launch.links.webcast) && (
              <div className="bg-white rounded-[15px] border border-gray-300 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  External Links
                </h3>
                <div className="space-y-3">
                  {launch.links.wikipedia && (
                    <a
                      href={launch.links.wikipedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-gray-50 rounded-[15px] border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      <Globe className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">Wikipedia</div>
                        <div className="text-sm text-gray-500">Read more about this mission</div>
                      </div>
                    </a>
                  )}
                  {launch.links.webcast && (
                    <a
                      href={launch.links.webcast}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-gray-50 rounded-[15px] border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      <Youtube className="h-5 w-5 text-red-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">Watch Launch</div>
                        <div className="text-sm text-gray-500">View the launch webcast</div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Mission Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[15px] border border-gray-300 p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{launch.name}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Flight #{launch.flight_number}</span>
                  <span>•</span>
                  <span>{new Date(launch.date_utc).getFullYear()}</span>
                  <span>•</span>
                  <span>{launch.rocketName}</span>
                </div>
              </div>

              {/* Mission Description */}
              {launch.details ? (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Mission Details</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {launch.details}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Mission Details</h2>
                  <div className="bg-gray-50 rounded-[15px] border border-gray-300 p-6 text-center">
                    <p className="text-gray-500">No detailed description available for this mission.</p>
                  </div>
                </div>
              )}

              {/* Mission Timeline */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Mission Timeline</h2>
                <div className="bg-gray-50 rounded-[15px] border border-gray-300 p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full ${
                        isSuccessful === true ? 'bg-green-500' : 
                        isSuccessful === false ? 'bg-red-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Launch: {launchDate.toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })} at {launchDate.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZoneName: 'short'
                        })}
                      </div>
                      <div className="text-sm text-gray-500">
                        {isSuccessful === true ? 'Mission completed successfully' : 
                         isSuccessful === false ? 'Mission failed' : 'Mission outcome unknown'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Technical Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-[15px] border border-gray-300 p-4">
                    <div className="text-sm text-gray-500 mb-1">Rocket</div>
                    <div className="font-medium text-gray-900">{launch.rocketName}</div>
                  </div>
                  <div className="bg-gray-50 rounded-[15px] border border-gray-300 p-4">
                    <div className="text-sm text-gray-500 mb-1">Flight Number</div>
                    <div className="font-medium text-gray-900">#{launch.flight_number}</div>
                  </div>
                  <div className="bg-gray-50 rounded-[15px] border border-gray-300 p-4">
                    <div className="text-sm text-gray-500 mb-1">Launch Year</div>
                    <div className="font-medium text-gray-900">{new Date(launch.date_utc).getFullYear()}</div>
                  </div>
                  <div className="bg-gray-50 rounded-[15px] border border-gray-300 p-4">
                    <div className="text-sm text-gray-500 mb-1">Mission Status</div>
                    <div className="font-medium text-gray-900">
                      {isSuccessful === true ? 'Success' : 
                       isSuccessful === false ? 'Failed' : 'Unknown'}
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
};

export default MissionDetails;
